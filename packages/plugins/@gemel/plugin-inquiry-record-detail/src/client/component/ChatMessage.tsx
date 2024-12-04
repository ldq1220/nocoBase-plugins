/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { Avatar } from 'antd';
import '../assets/css/chatMessage.css';
import classNames from 'classnames';

interface ChatMessage {
  speakerRole: 'human' | 'ai';
  content: string;
}

const ChatMessages: React.FC<{ messages: ChatMessage[] }> = ({ messages }) => {
  // 将换行符转换为<br/>
  const formatContent = (content: string) => {
    if (!content) return null;
    return content.split('\n').map((text, index) => (
      <React.Fragment key={index}>
        {text}
        {index !== content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="chatContainer">
      {messages.map((message, index) => {
        const isAi = message.speakerRole === 'ai';

        return (
          <div key={index} className={classNames('messageItem', isAi && 'messageItemSender')}>
            <Avatar
              className="avatar"
              size="small"
              style={{
                backgroundColor: isAi ? '#1890ff' : '#87d068',
              }}
            >
              {isAi ? 'AI' : 'U'}
            </Avatar>
            <div className={classNames('messageContent', isAi && 'messageContentSender')}>
              {formatContent(message.content)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
