import { AccessControl } from 'accesscontrol';

const ac = new AccessControl();

ac
  // Guest
  .grant("guest")
  .readAny("publicInfo");


ac
  // User
  .grant("user")
  .readOwn("profile")
  .updateOwn("profile")
  .readAny("publicInfo");

ac
  // Moderator
  .grant("moderator")
  .extend("user")
  .readAny("profile")
  .updateAny("profile");


ac
  // Admin
  .grant("admin")
  .extend("moderator")
  .createAny("user")
  .updateAny("user")
  .deleteAny("user")
  .readAny("system");

export default ac;``