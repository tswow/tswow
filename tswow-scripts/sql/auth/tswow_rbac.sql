-- Creates things
INSERT IGNORE INTO `rbac_permissions` VALUES(17688,"Command: at");
INSERT IGNORE INTO `rbac_permissions` VALUES(17689,"Command: clearat");
INSERT IGNORE INTO `rbac_permissions` VALUES(17690,"Command: id");
INSERT IGNORE INTO `rbac_permissions` VALUES(17691,"Command: test");

-- Makes these commands available to administrators
INSERT IGNORE INTO `rbac_linked_permissions` VALUES(192,17688);
INSERT IGNORE INTO `rbac_linked_permissions` VALUES(192,17689);
INSERT IGNORE INTO `rbac_linked_permissions` VALUES(192,17690);
INSERT IGNORE INTO `rbac_linked_permissions` VALUES(192,17691);