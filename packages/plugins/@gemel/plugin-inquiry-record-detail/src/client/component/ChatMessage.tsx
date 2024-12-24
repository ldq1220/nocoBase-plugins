/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { Avatar, Empty } from 'antd'; // 引入Empty组件
import dayjs from 'dayjs';
import '../assets/css/chatMessage.css';
import classNames from 'classnames';

interface ChatMessage {
  speakerRole: 'human' | 'ai';
  content: string;
  createdAt: number;
}

const ChatMessages: React.FC<{ messages: ChatMessage[] }> = ({ messages }) => {
  const formatContent = (content: string) => {
    if (!content) return null;
    return content.split('\n').map((text, index) => (
      <React.Fragment key={index}>
        {text}
        {index !== content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const formatTime = (timestamp: number) => {
    const messageDate = dayjs.unix(timestamp);
    const today = dayjs();

    if (messageDate.isSame(today, 'day')) {
      return messageDate.format('HH:mm');
    }
    return messageDate.format('YYYY-MM-DD HH:mm');
  };

  // 添加空状态判断
  if (!messages?.length) {
    return (
      <div
        className="chatContainer"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}
      >
        <Empty description="暂无聊天记录" />
      </div>
    );
  }

  return (
    <div className="chatContainer">
      {[...messages].reverse().map((message, index) => {
        const isAi = message.speakerRole === 'ai';

        return (
          <div key={index} className={classNames('messageItem', isAi && 'messageItemSender')}>
            <Avatar
              className="avatar"
              size="small"
              style={{
                backgroundColor: isAi ? '#1890ff' : '#87d068',
                marginTop: '10px',
              }}
            >
              {isAi ? 'AI' : 'U'}
            </Avatar>
            <div>
              <div className="messageTime">{formatTime(message.createdAt)}</div>
              <div className={classNames('messageContent', isAi && 'messageContentSender')}>
                {formatContent(message.content)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
