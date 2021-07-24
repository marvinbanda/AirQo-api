package airqo;

import airqo.models.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import org.apache.commons.lang3.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.HttpHeaders;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class Utils {

    private static final Logger logger = LoggerFactory.getLogger(Utils.class);
    public static SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'hh:mm:ss'Z'");

    public static Properties loadPropertiesFile(String propertiesFile){

        if(propertiesFile == null)
            propertiesFile = "application.properties";

        Properties props = new Properties();

        try (InputStream input = Utils.class.getClassLoader().getResourceAsStream(propertiesFile)) {
            props.load(input);
        }
        catch (Exception ex){
            logger.error("Error loading properties file `{}` : {}", propertiesFile, ex.toString());
        }

        return props;
    }

    public static Properties loadEnvProperties(List<String> keys){

        Properties props = new Properties();
        Set<String> systemKeys = System.getenv().keySet();

        keys.forEach(k -> {
            String envKey = k.trim().toUpperCase();
            if(systemKeys.contains(envKey)){
                String propKey = k.trim().toLowerCase();
                props.setProperty(propKey, System.getenv(envKey));
            }
        });

        return props;
    }

    public static TransformedDeviceMeasurements addHumidityAndTemp(TransformedDeviceMeasurements measurements, Properties props){

        List<Site> sites = Utils.getSites(props.getProperty("airqo.base.url"), props.getProperty("tenant"));

        measurements.getMeasurements().stream().map(measurement -> {

            Optional<Site> deviceSite = sites.stream().findFirst().filter(
                    site -> site.get_id().equals(measurement.getSiteId().toString()));

            try {
                if (deviceSite.isPresent() && !deviceSite.get().getNearestStation().getCode().equals("")){

                    Site.NearestStation station = deviceSite.get().getNearestStation();
                    Date endTime = dateFormat.parse(measurement.getTime().toString());
                    Date startTime = DateUtils.addHours(endTime, -3);

                    StationResponse stationResponse = getStationMeasurements(
                            props, station.getCode(), startTime, endTime, station.getTimezone());

                    List<StationMeasurement> stationMeasurements = stationResponseToMeasurements(stationResponse);

                    Optional<StationMeasurement> stationMeasurement = stationMeasurements
                            .stream()
                            .reduce((measurement1, measurement2) -> {
                                if (measurement1.getTime().after(measurement2.getTime()))
                                    return measurement1;
                                return measurement2;
                            });

                    logger.info(stationMeasurement.toString());

                    measurement.getInternalHumidity().setValue(0.1);
                    measurement.getInternalTemperature().setValue(0.1);
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return measurement;
        });

        return measurements;
    }

    public static List<Site> getSites(String baseUrl, String tenant){

        logger.info("\n\n********** Fetching Sites **************\n");

        SitesResponse sitesResponse;

        try {

            String urlString =  String.format("%sdevices/sites?tenant=%s", baseUrl, tenant);

            HttpClient httpClient = HttpClient.newBuilder()
                    .build();

            HttpRequest request = HttpRequest.newBuilder()
                    .GET()
                    .uri(URI.create(urlString))
                    .setHeader("Accept", "application/json")
                    .build();

            HttpResponse<String> httpResponse = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            ObjectMapper objectMapper = new ObjectMapper();
            sitesResponse = objectMapper.readValue(httpResponse.body(), new TypeReference<>() {});
        }
        catch (Exception e){
            e.printStackTrace();
            return new ArrayList<>();
        }

        logger.info("\n ====> Sites : {}\n", sitesResponse.getSites());
        return sitesResponse.getSites();
    }

    public static List<Device> getDevices(String baseUrl, String tenant){

        logger.info("\n\n********** Fetching Devices **************\n");

        DevicesResponse devicesResponse;

        try {

            String urlString =  String.format("%sdevices?tenant=%s&active=yes", baseUrl, tenant);

            HttpClient httpClient = HttpClient.newBuilder()
                    .build();

            HttpRequest request = HttpRequest.newBuilder()
                    .GET()
                    .uri(URI.create(urlString))
                    .setHeader("Accept", "application/json")
                    .build();

            HttpResponse<String> httpResponse = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            ObjectMapper objectMapper = new ObjectMapper();
            devicesResponse = objectMapper.readValue(httpResponse.body(), new TypeReference<>() {});
        }
        catch (Exception e){
            e.printStackTrace();
            return new ArrayList<>();
        }

//        StringBuilder stringBuilder = new StringBuilder();
//
//        devicesResponse.getDevices().forEach(device -> {
//            stringBuilder.append(" , ").append(device.getDevice_number());
//        });

//        logger.info("\n ====> Devices : {}\n", stringBuilder);
        return devicesResponse.getDevices();
    }

    public static StationResponse getStationMeasurements(Properties props, String stationCode, Date startTime, Date endTime, String stationTimeZone){

        logger.info("\n\n********** Fetching Station Data **************\n");

        StationResponse stationResponse;

        try {

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'hh:mm:ss'Z'");
            dateFormat.setTimeZone(TimeZone.getTimeZone(stationTimeZone));

            logger.info("{}", dateFormat.format(startTime));
            logger.info("{}", dateFormat.format(endTime));

            String urlString =  String.format("%sservices/measurements/v2/stations/%s/measurements/%s?start=%s&end=%s",
                    props.getProperty("tahmo.base.url") , stationCode, "controlled", dateFormat.format(startTime), dateFormat.format(endTime));

            HttpClient httpClient = HttpClient.newBuilder()
                    .build();

            String auth = props.getProperty("tahmo.user") + ":" + props.getProperty("tahmo.password");
            byte[] encodedAuth = Base64.getEncoder().encode(
                    auth.getBytes(StandardCharsets.ISO_8859_1));
            String authHeader = "Basic " + new String(encodedAuth);

            HttpRequest request = HttpRequest.newBuilder()
                    .GET()
                    .uri(URI.create(urlString))
                    .setHeader("Accept", "application/json")
                    .setHeader(HttpHeaders.AUTHORIZATION, authHeader)
                    .build();

            HttpResponse<String> httpResponse = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            ObjectMapper objectMapper = new ObjectMapper();

            stationResponse = objectMapper.readValue(httpResponse.body(), new TypeReference<>() {});
            return stationResponse;
        }
        catch (Exception e){
            e.printStackTrace();
            return new StationResponse();
        }

    }

    public static List<StationMeasurement> stationResponseToMeasurements(StationResponse stationResponse){

        List<List<Object>> objects = stationResponse.getResults().get(0).getSeries().get(0).getValues();
        List<StationMeasurement> measurements = new ArrayList<>();

        objects.forEach(object -> {

            String var = String.valueOf(object.get(11)).trim().toLowerCase();
            String time = String.valueOf(object.get(0)).trim();

            try {
                if(var.equals("te") || var.equals("rh")){
                    Variable variable = Variable.fromString(var);
                    Double value = Double.valueOf(object.get(10) + "");
                    Date dateTime = dateFormat.parse(time);

                    StationMeasurement measurement = new StationMeasurement(dateTime, value, variable);
                    measurements.add(measurement);
                }
            } catch (ParseException e) {
                logger.error("Time {}", object.get(0));
                logger.error("Value {}", object.get(10));
                logger.error("Variable {}", object.get(11));
                e.printStackTrace();
            }
        });
            return measurements;
    }


    public static void getMeasurements(String urlString, String device, int channel){

        logger.info("\n\n**************** Fetching Measurements *************\n");
        logger.info("\n====> Url : {}\n", urlString);

        try {
            HttpClient httpClient = HttpClient.newBuilder()
                    .build();

            HttpRequest request = HttpRequest.newBuilder()
                    .GET()
                    .uri(URI.create(urlString))
                    .setHeader("Accept", "application/json")
                    .build();

            HttpResponse<String> httpResponse = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            RawMeasurement measurements = new ObjectMapper().readerFor(RawMeasurement.class).readValue(httpResponse.body());

            String humidity = measurements.getInternalHumidity().toLowerCase().trim();
            String temp = measurements.getInternalTemperature().toLowerCase().trim();

            if(isNull(humidity) || isNull(temp) ){
                logger.info(device + " : " + channel);
//                logger.info(device);
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    public static boolean isNull(String value){
        try {
            double data = Double.parseDouble(value);
            if (data < 0.0 || data > 1000 )
                return true;

        } catch (NumberFormatException e) {
            return true;
        }
        return false;
    }
}
