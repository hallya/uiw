import React from 'react';
import classnames from 'classnames';
import { IProps } from '@uiw/utils';
import DescriptionsItem, { DescriptionsItemProps } from './DescriptionsItem';
import Row, { RowProps } from './Row';
import './style/index.less';

export * from './DescriptionsItem';

export interface DescriptionsProps extends IProps {
  column?: number;
  title?: React.ReactNode;
  children?: React.ReactNode;
  bordered?: boolean;
  colon?: boolean;
  size?: 'large' | 'small' | 'default';
  layout?: RowProps['layout'];
}

const generateChildrenRows = (
  children: React.ReactElement<DescriptionsItemProps>[],
  column: number,
): Array<React.ReactElement<DescriptionsItemProps>[]> => {
  const rows: React.ReactElement<DescriptionsItemProps>[][] = [];
  let columns: React.ReactElement<DescriptionsItemProps>[] | null = null;
  let leftSpans: number;

  children.forEach(
    (node: React.ReactElement<DescriptionsItemProps>, index: number) => {
      let itemNode = node;

      if (!columns) {
        leftSpans = column;
        columns = [];
        rows.push(columns);
      }

      // Always set last span to align the end of Descriptions
      const lastItem = index === children.length - 1;
      if (lastItem) {
        itemNode = React.cloneElement(itemNode, {
          span: leftSpans,
        });
      }
      // Calculate left fill span
      const { span = 1 } = itemNode.props;
      columns.push(itemNode);
      leftSpans -= span;

      if (leftSpans <= 0) {
        columns = null;
      }
    },
  );

  return rows;
};

function InternalDescriptions(props: DescriptionsProps = {}) {
  const {
    prefixCls = 'w-descriptions',
    className,
    title,
    bordered,
    column = 3,
    size,
    colon = true,
    children,
    layout = 'horizontal',
    ...other
  } = props;
  const cls = classnames(prefixCls, className, `${prefixCls}-${layout}`, {
    [`${prefixCls}-bordered`]: bordered,
    [`${prefixCls}-${size}`]: size,
  });

  const cloneChildren = React.Children.toArray(children) as JSX.Element[];
  const childs: Array<
    React.ReactElement<DescriptionsItemProps>[]
  > = generateChildrenRows(cloneChildren, column!);

  return (
    <div className={cls}>
      <table {...other}>
        {title && <caption className={`${prefixCls}-title`}>{title}</caption>}
        <tbody>
          {childs.map((child, index) => (
            <Row
              key={index}
              prefixCls={prefixCls}
              bordered={bordered}
              colon={colon}
              column={column}
              layout={layout}
            >
              {child}
            </Row>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<DescriptionsProps> {
  Item: typeof DescriptionsItem;
}

const Descriptions = React.forwardRef<unknown, DescriptionsProps>(
  InternalDescriptions,
) as CompoundedComponent;

Descriptions.Item = DescriptionsItem;

export default Descriptions;
