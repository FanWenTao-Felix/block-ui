import bem from '../bem'
import { KEY_COMPONENT_NAME } from '../global/variable'
export default function (sfc) {
  sfc.name = KEY_COMPONENT_NAME + sfc.name
  sfc.mixins = sfc.mixins || []
  sfc.mixins.push(bem)
  return sfc
}
