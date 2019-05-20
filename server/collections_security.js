import { collectionSecurity } from "./collections_security_options";
import { PublicCount, PrivateCount, AdminCount } from "/client_server/collections";

if (!PublicCount.findOne()) PublicCount.insert({ count: 0 });
PublicCount.allow(collectionSecurity.allow.all);

PrivateCount.allow(collectionSecurity.allow.owner);
PrivateCount.before.insert(function(userId, doc) {
  doc.owner = userId;
});

if (!AdminCount.findOne())
  AdminCount.insert({
    count: 0
  });
AdminCount.allow(collectionSecurity.allow.admin);
