import { Button, message, Space } from 'antd';
import ProForm, { ProFormText, DrawerForm, ProFormSlider } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { SketchPicker } from 'react-color';

export default class SettingComponent extends React.Component<{
  setDrawTextParams: (params: any) => void;
  drawTextParams: WaterDrawTextParams;
  setPaperPage: () => void;
}> {
  state: Readonly<{ drawerVisit: boolean; color: ColorResult }> = {
    drawerVisit: false,
    color: null as unknown as ColorResult,
  };

  setColor = (color: ColorResult) => {
    this.setState({ color });
  };

  componentDidMount() {
    this.setColor(this.props.drawTextParams.color);
  }

  render() {
    return (
      <>
        <Space
          style={{
            marginTop: '10px',
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              this.setState({ drawerVisit: true });
            }}
          >
            <PlusOutlined />
            设置水印
          </Button>
          <Button
            type="primary"
            onClick={() => {
              const iframe = document.querySelector('iframe') as HTMLIFrameElement;
              if (iframe) {
                iframe.contentWindow?.print();
              }
            }}
          >
            打印文档
          </Button>
          <Button type="primary" onClick={this.props.setPaperPage}>切换试卷</Button>
        </Space>
        {this.props.drawTextParams ? (
          <DrawerForm
            onVisibleChange={(drawerVisit) => this.setState({ drawerVisit })}
            title="新建表单"
            visible={this.state.drawerVisit}
            onFinish={async (values) => {
              message.success('提交成功');
              this.props.setDrawTextParams({ ...values, color: this.state.color });
              return true;
            }}
            initialValues={this.props.drawTextParams}
          >
            <ProForm.Group>
              <ProFormText
                width="md"
                name="watermark"
                label="水印内容"
                tooltip="最长为 24 位"
                placeholder="请输入水印内容"
              />
              <ProFormSlider
                name="rotate"
                label="旋转"
                width="lg"
                max={180}
                min={-180}
                marks={{
                  0: '0',
                  90: '90',
                  180: '180',
                  '-180': '-180',
                  '-90': '-90',
                }}
              />
              <ProFormSlider
                name="fontsize"
                label="字体大小"
                width="lg"
                max={400}
                min={8}
                marks={{
                  0: '0',
                  100: '100',
                  200: '200',
                  300: '300',
                  400: '400',
                }}
              />
            </ProForm.Group>
            <SketchPicker
              color={this.state.color?.rgb}
              onChange={this.setColor}
              onChangeComplete={this.setColor}
            />
          </DrawerForm>
        ) : null}
      </>
    );
  }
}
