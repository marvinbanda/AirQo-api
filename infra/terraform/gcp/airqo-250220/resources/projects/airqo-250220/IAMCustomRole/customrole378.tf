resource "google_iam_custom_role" "customrole378" {
  permissions = ["appengine.applications.get", "appengine.applications.update", "appengine.instances.get", "appengine.instances.list", "appengine.operations.get", "appengine.operations.list", "appengine.services.get", "appengine.services.list", "appengine.services.update", "appengine.versions.get", "appengine.versions.list", "bigquery.bireservations.get", "bigquery.bireservations.update", "bigquery.capacityCommitments.create", "bigquery.capacityCommitments.get", "bigquery.capacityCommitments.list", "bigquery.config.get", "bigquery.config.update", "bigquery.connections.create", "bigquery.connections.get", "bigquery.connections.getIamPolicy", "bigquery.connections.list", "bigquery.connections.setIamPolicy", "bigquery.connections.update", "bigquery.connections.use", "bigquery.datasets.create", "bigquery.datasets.get", "bigquery.datasets.getIamPolicy", "bigquery.datasets.setIamPolicy", "bigquery.datasets.update", "bigquery.datasets.updateTag", "bigquery.jobs.create", "bigquery.jobs.get", "bigquery.jobs.list", "bigquery.jobs.listAll", "bigquery.jobs.update", "bigquery.models.create", "bigquery.models.getData", "bigquery.models.getMetadata", "bigquery.models.list", "bigquery.models.updateData", "bigquery.models.updateMetadata", "bigquery.models.updateTag", "bigquery.readsessions.create", "bigquery.readsessions.getData", "bigquery.readsessions.update", "bigquery.reservationAssignments.create", "bigquery.reservationAssignments.list", "bigquery.reservationAssignments.search", "bigquery.reservations.create", "bigquery.reservations.get", "bigquery.reservations.list", "bigquery.reservations.update", "bigquery.routines.create", "bigquery.routines.get", "bigquery.routines.list", "bigquery.routines.update", "bigquery.savedqueries.create", "bigquery.savedqueries.get", "bigquery.savedqueries.list", "bigquery.savedqueries.update", "bigquery.tables.create", "bigquery.tables.export", "bigquery.tables.get", "bigquery.tables.getData", "bigquery.tables.getIamPolicy", "bigquery.tables.list", "bigquery.tables.setCategory", "bigquery.tables.setIamPolicy", "bigquery.tables.update", "bigquery.tables.updateData", "bigquery.tables.updateTag", "bigquery.transfers.get", "bigquery.transfers.update", "cloudbuild.builds.create", "cloudbuild.builds.get", "cloudbuild.builds.list", "cloudfunctions.functions.call", "cloudfunctions.functions.create", "cloudfunctions.functions.get", "cloudfunctions.functions.getIamPolicy", "cloudfunctions.functions.invoke", "cloudfunctions.functions.list", "cloudfunctions.functions.setIamPolicy", "cloudfunctions.functions.sourceCodeGet", "cloudfunctions.functions.sourceCodeSet", "cloudfunctions.functions.update", "cloudfunctions.locations.list", "cloudfunctions.operations.get", "cloudfunctions.operations.list", "cloudnotifications.activities.list", "cloudscheduler.jobs.enable", "cloudscheduler.jobs.fullView", "cloudscheduler.jobs.get", "cloudscheduler.jobs.list", "cloudscheduler.jobs.pause", "cloudscheduler.jobs.run", "cloudscheduler.jobs.update", "cloudscheduler.locations.get", "cloudscheduler.locations.list", "cloudsql.backupRuns.create", "cloudsql.backupRuns.get", "cloudsql.backupRuns.list", "cloudsql.databases.create", "cloudsql.databases.get", "cloudsql.databases.list", "cloudsql.databases.update", "cloudsql.instances.addServerCa", "cloudsql.instances.clone", "cloudsql.instances.connect", "cloudsql.instances.create", "cloudsql.instances.demoteMaster", "cloudsql.instances.export", "cloudsql.instances.failover", "cloudsql.instances.get", "cloudsql.instances.import", "cloudsql.instances.list", "cloudsql.instances.listServerCas", "cloudsql.instances.promoteReplica", "cloudsql.instances.resetSslConfig", "cloudsql.instances.restart", "cloudsql.instances.restoreBackup", "cloudsql.instances.rotateServerCa", "cloudsql.instances.startReplica", "cloudsql.instances.stopReplica", "cloudsql.instances.truncateLog", "cloudsql.instances.update", "cloudsql.sslCerts.create", "cloudsql.sslCerts.get", "cloudsql.sslCerts.list", "cloudsql.users.create", "cloudsql.users.list", "cloudsql.users.update", "compute.acceleratorTypes.get", "compute.acceleratorTypes.list", "compute.addresses.get", "compute.addresses.list", "compute.addresses.use", "compute.autoscalers.get", "compute.autoscalers.list", "compute.autoscalers.update", "compute.backendBuckets.get", "compute.backendBuckets.list", "compute.backendServices.get", "compute.backendServices.list", "compute.diskTypes.get", "compute.diskTypes.list", "compute.disks.addResourcePolicies", "compute.disks.createSnapshot", "compute.disks.get", "compute.disks.getIamPolicy", "compute.disks.list", "compute.disks.removeResourcePolicies", "compute.disks.resize", "compute.disks.setIamPolicy", "compute.disks.setLabels", "compute.disks.update", "compute.disks.use", "compute.disks.useReadOnly", "compute.externalVpnGateways.get", "compute.externalVpnGateways.list", "compute.firewalls.get", "compute.firewalls.list", "compute.forwardingRules.get", "compute.forwardingRules.list", "compute.globalAddresses.get", "compute.globalAddresses.list", "compute.globalAddresses.use", "compute.globalForwardingRules.get", "compute.globalForwardingRules.list", "compute.globalOperations.get", "compute.globalOperations.list", "compute.healthChecks.get", "compute.healthChecks.list", "compute.httpHealthChecks.get", "compute.httpHealthChecks.list", "compute.httpsHealthChecks.get", "compute.httpsHealthChecks.list", "compute.images.deprecate", "compute.images.get", "compute.images.getFromFamily", "compute.images.getIamPolicy", "compute.images.list", "compute.images.setIamPolicy", "compute.images.setLabels", "compute.images.update", "compute.images.useReadOnly", "compute.instanceGroupManagers.get", "compute.instanceGroupManagers.list", "compute.instanceGroupManagers.update", "compute.instanceGroupManagers.use", "compute.instanceGroups.get", "compute.instanceGroups.list", "compute.instanceGroups.update", "compute.instanceGroups.use", "compute.instanceTemplates.get", "compute.instanceTemplates.getIamPolicy", "compute.instanceTemplates.list", "compute.instanceTemplates.setIamPolicy", "compute.instanceTemplates.useReadOnly", "compute.instances.addAccessConfig", "compute.instances.addMaintenancePolicies", "compute.instances.attachDisk", "compute.instances.create", "compute.instances.deleteAccessConfig", "compute.instances.detachDisk", "compute.instances.get", "compute.instances.getEffectiveFirewalls", "compute.instances.getGuestAttributes", "compute.instances.getIamPolicy", "compute.instances.getScreenshot", "compute.instances.getSerialPortOutput", "compute.instances.getShieldedInstanceIdentity", "compute.instances.getShieldedVmIdentity", "compute.instances.list", "compute.instances.listReferrers", "compute.instances.osAdminLogin", "compute.instances.osLogin", "compute.instances.removeMaintenancePolicies", "compute.instances.reset", "compute.instances.resume", "compute.instances.setDeletionProtection", "compute.instances.setIamPolicy", "compute.instances.setLabels", "compute.instances.setMachineResources", "compute.instances.setMachineType", "compute.instances.setMetadata", "compute.instances.setMinCpuPlatform", "compute.instances.setScheduling", "compute.instances.setServiceAccount", "compute.instances.setShieldedInstanceIntegrityPolicy", "compute.instances.setShieldedVmIntegrityPolicy", "compute.instances.setTags", "compute.instances.start", "compute.instances.startWithEncryptionKey", "compute.instances.stop", "compute.instances.suspend", "compute.instances.update", "compute.instances.updateAccessConfig", "compute.instances.updateDisplayDevice", "compute.instances.updateNetworkInterface", "compute.instances.updateShieldedInstanceConfig", "compute.instances.updateShieldedVmConfig", "compute.instances.use", "compute.interconnectAttachments.get", "compute.interconnectAttachments.list", "compute.interconnectLocations.get", "compute.interconnectLocations.list", "compute.interconnects.get", "compute.interconnects.list", "compute.licenseCodes.get", "compute.licenseCodes.getIamPolicy", "compute.licenseCodes.list", "compute.licenseCodes.setIamPolicy", "compute.licenseCodes.update", "compute.licenseCodes.use", "compute.licenses.get", "compute.licenses.getIamPolicy", "compute.licenses.list", "compute.licenses.setIamPolicy", "compute.machineTypes.get", "compute.machineTypes.list", "compute.networkEndpointGroups.attachNetworkEndpoints", "compute.networkEndpointGroups.detachNetworkEndpoints", "compute.networkEndpointGroups.get", "compute.networkEndpointGroups.getIamPolicy", "compute.networkEndpointGroups.list", "compute.networkEndpointGroups.setIamPolicy", "compute.networkEndpointGroups.use", "compute.networks.get", "compute.networks.list", "compute.networks.use", "compute.networks.useExternalIp", "compute.projects.get", "compute.projects.setCommonInstanceMetadata", "compute.regionBackendServices.get", "compute.regionBackendServices.list", "compute.regionHealthCheckServices.get", "compute.regionHealthCheckServices.list", "compute.regionNotificationEndpoints.get", "compute.regionNotificationEndpoints.list", "compute.regionOperations.get", "compute.regionOperations.list", "compute.regions.get", "compute.regions.list", "compute.reservations.get", "compute.reservations.list", "compute.resourcePolicies.get", "compute.resourcePolicies.list", "compute.resourcePolicies.use", "compute.routers.get", "compute.routers.list", "compute.routes.get", "compute.routes.list", "compute.snapshots.get", "compute.snapshots.getIamPolicy", "compute.snapshots.list", "compute.snapshots.setIamPolicy", "compute.snapshots.setLabels", "compute.snapshots.useReadOnly", "compute.sslCertificates.get", "compute.sslCertificates.list", "compute.sslPolicies.get", "compute.sslPolicies.list", "compute.sslPolicies.listAvailableFeatures", "compute.subnetworks.get", "compute.subnetworks.list", "compute.subnetworks.use", "compute.subnetworks.useExternalIp", "compute.targetHttpProxies.get", "compute.targetHttpProxies.list", "compute.targetHttpsProxies.get", "compute.targetHttpsProxies.list", "compute.targetInstances.get", "compute.targetInstances.list", "compute.targetPools.get", "compute.targetPools.list", "compute.targetSslProxies.get", "compute.targetSslProxies.list", "compute.targetTcpProxies.get", "compute.targetTcpProxies.list", "compute.targetVpnGateways.get", "compute.targetVpnGateways.list", "compute.urlMaps.get", "compute.urlMaps.list", "compute.vpnGateways.get", "compute.vpnGateways.list", "compute.vpnTunnels.get", "compute.vpnTunnels.list", "compute.zoneOperations.get", "compute.zoneOperations.list", "compute.zones.get", "compute.zones.list", "dataflow.jobs.cancel", "dataflow.jobs.create", "dataflow.jobs.get", "dataflow.jobs.list", "dataflow.jobs.snapshot", "dataflow.jobs.updateContents", "dataflow.messages.list", "dataflow.metrics.get", "dataflow.snapshots.get", "dataflow.snapshots.list", "dataprep.projects.use", "errorreporting.applications.list", "errorreporting.errorEvents.create", "errorreporting.errorEvents.list", "errorreporting.groupMetadata.get", "errorreporting.groupMetadata.update", "errorreporting.groups.list", "iam.serviceAccountKeys.create", "iam.serviceAccounts.actAs", "iam.serviceAccounts.get", "iam.serviceAccounts.list", "iap.tunnelInstances.accessViaIAP", "logging.buckets.get", "logging.buckets.list", "logging.buckets.update", "logging.cmekSettings.get", "logging.cmekSettings.update", "logging.exclusions.create", "logging.exclusions.get", "logging.exclusions.list", "logging.exclusions.update", "logging.logEntries.create", "logging.logEntries.list", "logging.logMetrics.create", "logging.logMetrics.get", "logging.logMetrics.list", "logging.logMetrics.update", "logging.logServiceIndexes.list", "logging.logServices.list", "logging.logs.list", "logging.privateLogEntries.list", "logging.sinks.create", "logging.sinks.get", "logging.sinks.list", "logging.sinks.update", "logging.usage.get", "monitoring.metricDescriptors.create", "monitoring.metricDescriptors.get", "monitoring.metricDescriptors.list", "monitoring.monitoredResourceDescriptors.get", "monitoring.monitoredResourceDescriptors.list", "monitoring.timeSeries.create", "monitoring.timeSeries.list", "pubsub.snapshots.create", "pubsub.snapshots.get", "pubsub.snapshots.getIamPolicy", "pubsub.snapshots.list", "pubsub.snapshots.seek", "pubsub.snapshots.setIamPolicy", "pubsub.snapshots.update", "pubsub.subscriptions.consume", "pubsub.subscriptions.create", "pubsub.subscriptions.get", "pubsub.subscriptions.getIamPolicy", "pubsub.subscriptions.list", "pubsub.subscriptions.setIamPolicy", "pubsub.subscriptions.update", "pubsub.topics.attachSubscription", "pubsub.topics.create", "pubsub.topics.get", "pubsub.topics.getIamPolicy", "pubsub.topics.list", "pubsub.topics.publish", "pubsub.topics.setIamPolicy", "pubsub.topics.update", "pubsub.topics.updateTag", "resourcemanager.projects.get", "run.configurations.get", "run.configurations.list", "run.locations.list", "run.revisions.get", "run.revisions.list", "run.routes.get", "run.routes.list", "run.services.create", "run.services.get", "run.services.list", "run.services.update", "serviceusage.operations.cancel", "serviceusage.operations.get", "serviceusage.operations.list", "serviceusage.quotas.get", "serviceusage.quotas.update", "serviceusage.services.disable", "serviceusage.services.enable", "serviceusage.services.get", "serviceusage.services.list", "serviceusage.services.use", "storage.buckets.create", "storage.buckets.get", "storage.buckets.list", "storage.buckets.update", "storage.objects.create", "storage.objects.get", "storage.objects.list", "storage.objects.update"]
  project     = "airqo-250220"
  role_id     = "CustomRole378"
  title       = "AirQo Level Two"
}
# terraform import google_iam_custom_role.customrole378 airqo-250220##CustomRole378
