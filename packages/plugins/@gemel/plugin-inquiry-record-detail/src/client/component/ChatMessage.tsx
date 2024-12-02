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
import styles from '../assets/css/chatMessage.css';
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
    <div className={styles.chatContainer}>
      {messages.map((message, index) => {
        const isHuman = message.speakerRole === 'human';

        return (
          <div key={index} className={classNames(styles.messageItem, isHuman && styles.messageItemSender)}>
            <Avatar
              className={styles.avatar}
              size="small"
              style={{
                backgroundColor: isHuman ? '#1890ff' : '#87d068',
              }}
            >
              {isHuman ? 'AI' : 'U'}
            </Avatar>
            <div className={classNames(styles.messageContent, isHuman && styles.messageContentSender)}>
              {formatContent(message.content)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
