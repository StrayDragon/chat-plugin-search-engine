import { PluginRenderProps } from '@lobehub/chat-plugin-sdk';
import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { Result } from './type';

const useStyles = createStyles(({ css, token, cx }) => {
  const title = css`
    margin-top: 4px;
    font-size: 16px;
  `;
  return {
    container: css`
      overflow: scroll;
      max-height: 370px;
    `,
    desc: css`
      color: ${token.colorTextTertiary};
    `,
    displayLink: css`
      color: ${token.colorTextQuaternary};
    `,
    favicon: css`
      border-radius: 50%;
    `,
    item: css`
      :not(:last-child) {
        border-bottom: 1px solid ${token.colorBorder};
      }
    `,
    link: css`
      &:hover {
        .${cx(title)} {
          text-decoration: underline;
        }
      }
    `,
    title,
  };
});

const Render = memo<PluginRenderProps<Result>>(({ content }) => {
  const { styles } = useStyles();
  return (
    <Flexbox className={styles.container}>
      {content.map((item, index) => (
        <Flexbox
          className={styles.item}
          distribution={'space-between'}
          horizontal
          key={item.link}
          padding={12}
        >
          <Flexbox>
            <a className={styles.link} href={item.link!} rel="noreferrer" target={'_blank'}>
              <Flexbox>
                <Flexbox align={'center'} gap={12} horizontal>
                  {item.favicon && (
                    <img
                      alt={item.title || item.link}
                      className={styles.favicon}
                      height={24}
                      src={item.favicon}
                      width={24}
                    />
                  )}
                  <Flexbox>
                    <Flexbox className={styles.desc}>{item.source}</Flexbox>
                    <Flexbox className={styles.displayLink}>{item.displayed_link}</Flexbox>
                  </Flexbox>
                </Flexbox>
                <Flexbox align={'baseline'} gap={2} horizontal>
                  <div>{index + 1}.</div>
                  <Flexbox className={styles.title}>{item.title}</Flexbox>
                </Flexbox>
              </Flexbox>
            </a>
            <Flexbox className={styles.desc}>
              {item.date ? `${item.date} - ${item.content}` : item.content}
            </Flexbox>
          </Flexbox>
        </Flexbox>
      ))}
    </Flexbox>
  );
});

export default Render;
