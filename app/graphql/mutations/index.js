import drug from './drug';
import user from './user';
import child from './child';
import doctor from './doctor';
import hospital from './hospital';
import protocole from './protocole';
import cases from './case';

export default {
  ...drug,
  ...user,
  ...child,
  ...doctor,
  ...hospital,
  ...protocole,
  ...cases
};
