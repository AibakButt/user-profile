import dev_keys from './dev_keys';
import prod_keys from './prod_keys';

let keys: any;
if (process.env.NODE_ENV === 'production') {
  keys = prod_keys
} else {
  keys = dev_keys;
}

export default keys;