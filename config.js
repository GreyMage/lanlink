var config = {}
config.net = {};
config.hosts = {};
config.time = {};
/* DO NOT EDIT ANYTHING ABOVE THIS LINE */
config.net.port = 4632
config.net.broadcastIP = "192.168.2.255";
config.time.interval = 1000 * 60 * 5 // 5 Minutes.
config.hosts.Windows_NT = "C:\\Windows\\System32\\drivers\\etc\\hosts";
config.hosts.Linux = "/etc/hosts";
/* DO NOT EDIT ANYTHING BELOW THIS LINE */
module.exports = config;