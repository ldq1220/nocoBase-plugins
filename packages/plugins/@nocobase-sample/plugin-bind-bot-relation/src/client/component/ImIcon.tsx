/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import {
  AiWebsiteIcon,
  AlibabaTmIcon,
  LiveCustomerIcon,
  QqIcon,
  TiktokIcon,
  WechatIcon,
  WecomIcon,
  WhatsappBotIcon,
  XhsIcon,
} from '../svg';

interface ImIconProps {
  im: string;
}

export const ImIcon = ({ im }: ImIconProps) => {
  switch (im) {
    case 'alibaba-tm':
      return <AlibabaTmIcon />;
    case 'wecom':
      return <WecomIcon />;
    case 'wechat':
      return <WechatIcon />;
    case 'whatsapp-bot':
      return <WhatsappBotIcon />;
    case 'qq':
      return <QqIcon />;
    case 'tiktok':
      return <TiktokIcon />;
    case 'xhs':
      return <XhsIcon />;
    case 'live-customer':
      return <LiveCustomerIcon />;
    case 'ai-website':
      return <AiWebsiteIcon />;
    default:
      return null;
  }
};
