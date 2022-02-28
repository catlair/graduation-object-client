import { PaperLifeEnum, PaperLifeLabel } from '@/enums/paper';
import { getPaperLife } from '@/services/paper';
import { Steps } from 'antd';
import Content from './Content';
import React from 'react';

const { Step } = Steps;

export default class Demo extends React.Component<{ paperId: string }> {
  state = {
    current: 0,
    paperLife: [] as API.PaperLife[],
  };

  onChange = (current) => {
    this.setState({ current });
  };

  componentDidMount() {
    getPaperLife(this.props.paperId).then((res) => {
      this.setState({ paperLife: res, current: res.length - 1 ?? 0 });
    });
  }

  render() {
    const { current } = this.state;

    return (
      <>
        <Steps current={current} onChange={this.onChange} direction="horizontal">
          {this.state.paperLife.map((item) => {
            // 将 content 截断
            let content;
            if (!item.content) {
              content = '没有说明';
            } else {
              content = item.content.length > 20 ? `${item.content.slice(0, 20)}...` : item.content;
            }

            return (
              <Step
                key={item.id}
                status={item.status === PaperLifeEnum.REJECT ? 'error' : 'process'}
                title={PaperLifeLabel[item.status]}
                description={content}
              />
            );
          })}
        </Steps>
        {this.state.paperLife[current] ? (
          <Content paperLife={this.state.paperLife[current]}></Content>
        ) : null}
      </>
    );
  }
}
