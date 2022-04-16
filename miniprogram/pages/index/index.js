import { getOpenId } from "../../controller/index";
import { createGroup, createTask, getOneTask, isRegister } from "../../service/index";
import Dialog from '../../miniprogram_npm/tdesign-miniprogram/dialog/index';
import Toast from '../../miniprogram_npm/tdesign-miniprogram/toast/index';

// index.js

Page({
  data: {
    headerText: '开大船',
    contentList: [{
      id: '111',
      content: '跳绳',
      select: false
    }, {
      id: '222',
      content: '开大船',
      select: false
    }, {
      id: '333',
      content: '跳绳',
      select: true
    }],
    visible: false,
    newGroupName: '',
    newGroupDescription: ''
  },
  async onLoad() {
    console.log('load');
    if (!await isRegister()) {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
    // wx.navigateTo({
    //   url: '/pages/createGroup/index',
    // })
  },
  async onClickDetail(e) {
    const openId = await getOpenId();
    const id = e.detail.id;
    const task = await getOneTask({
      task_id: id,
    })
    const complete = task.completeUsers.find(u => u.wx_id === openId).complete;
    // wx.navigateTo({
    //   url: `/pages/detail/index?name=${task.name}&target=${task.description}&startTime=${task.start_time}&endTime=${task.end_time}&complete=${complete}`,
    // })
  },
  onAdd() {
    console.log('click add');
    this.setData({
      visible: true
    })
  },
  async onCreateGroup() {
    this.setData({
      visible: false
    })
    Dialog.confirm({
      title: '创建队伍',
      confirmBtn: '创建',
      cancelBtn: '取消',
    }).then(async () => {
      if (!this.data.newGroupDescription && !this.data.newGroupName) {
        Toast({
          context: this,
          selector: '#t-toast-create-group',
          message: '请输入完整信息',
        });
        return;
      }
      const suc = await createGroup({
        name: this.data.newGroupName,
        description: this.data.newGroupDescription
      })
      Toast({
        context: this,
        selector: '#t-toast-create-group',
        message: suc ? '创建成功' : '创建失败，请重试',
      });
    })
  },
  onJoinGroup() {
    this.setData({
      visible: false
    })
  },
  onAddClock() {
    this.setData({
      visible: false
    })
  }
});


