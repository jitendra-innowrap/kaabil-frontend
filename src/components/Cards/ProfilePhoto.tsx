import React from 'react'
import { getCompanyInitials } from '../utils';

const bgColors = ['#A7226E', '#EC2049', '#F26B38', '#F7DB4F', '#2F9599'];
export default function ProfilePhoto({ name, logo, index, styles }:{ name?: string; logo?: string; index: number; styles: string }) {
    if (logo) {
      return (
        <img
          src={logo}
          width={68}
          height={68}
          alt="company profile logo"
          className={styles}
        />
      );
    }
  
    // Select random color
    const bgColor = bgColors[index % bgColors.length];
  
    return (
      <div
        className={`flex items-center justify-center text-white font-semibold text-sm ${styles}`}
        style={{ backgroundColor: bgColor }}
      >
        {getCompanyInitials(name)}
      </div>
    );
}
