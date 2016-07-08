import useSheet from 'react-jss';
import jss from 'jss';
import vendorPrefixer from 'jss-vendor-prefixer';
import jssCamelCase from 'jss-camel-case';
import nested from 'jss-nested';
import propsSort from 'jss-props-sort';

jss.use(propsSort());
jss.use(nested());
jss.use(jssCamelCase());
jss.use(vendorPrefixer());

export default function JssContainer(component, styles, options) {
  return useSheet(component, styles, options);
}
