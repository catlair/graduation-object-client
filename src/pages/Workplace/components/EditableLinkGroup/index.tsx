import React, { createElement } from 'react';
import styles from './index.less';

export type EditableLink = {
  title: string;
  href: string;
  id?: string;
};

type EditableLinkGroupProps = {
  links: EditableLink[];
  linkElement: any;
};

const EditableLinkGroup: React.FC<EditableLinkGroupProps> = (props) => {
  const { links, linkElement } = props;
  return (
    <div className={styles.linkGroup}>
      {links.map((link) =>
        createElement(
          linkElement,
          {
            key: `linkGroup-item-${link.id || link.title}`,
            to: link.href,
            href: link.href,
          },
          link.title,
        ),
      )}
    </div>
  );
};

EditableLinkGroup.defaultProps = {
  links: [],
  linkElement: 'a',
};

export default EditableLinkGroup;
