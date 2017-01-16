'use strict';
/**
 * config
 */
export default {
  //key: value
   resource_on: true,
   resource_reg: /^(static\/|[^\/]+\.(?!js|html)\w+$)/, //判断为静态资源请求的正则
   port:8369
};