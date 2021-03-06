import { Tooltip, OverlayTrigger, Switch, Button, Input, Divider } from 'uiw';
import Markdown from '@/components/Markdown';

export default class Page extends Markdown {
  path =
    'https://github.com/uiwjs/uiw/tree/master/packages/react-tooltip/README.md';
  dependencies = { Tooltip, OverlayTrigger, Switch, Button, Input, Divider };
  async renderPage() {
    const md = await import('uiw/node_modules/@uiw/react-tooltip/README.md');
    return md.default || md;
  }
}
