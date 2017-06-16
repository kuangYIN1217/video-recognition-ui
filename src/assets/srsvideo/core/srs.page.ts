declare var $: any;
import {get_browser_agents} from './winlin.utility'
/**
 * 初始化
 * @param dom
 */


export const srs_can_republish = () => {
  var browser = get_browser_agents();

  if (browser.Chrome || browser.Firefox) {
    return true;
  }

  if (browser.MSIE || browser.QQBrowser) {
    return false;
  }

  return false;
}
