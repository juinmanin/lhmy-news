const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email transporter configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'lhmy.kr@gmail.com',
    pass: process.env.EMAIL_PASS || 'lhmykr1004'
  }
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Helper function to send email
const sendEmail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

// 문의하기 endpoint
app.post('/send-inquiry', async (req, res) => {
  try {
    console.log('Received inquiry:', req.body);
    
    const { name, phone, email, inquiryType, message } = req.body;

    const mailOptions = {
      from: 'lhmy.kr@gmail.com',
      to: 'lhmy.kr@gmail.com',
      subject: '홈페이지 문의',
      html: `
        <h2>홈페이지 문의</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>문의 유형:</strong> ${inquiryType || '미선택'}</p>
        <p><strong>메시지:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>문의 시간: ${new Date().toLocaleString('ko-KR')}</small></p>
      `
    };

    const result = await sendEmail(mailOptions);
    
    if (result.success) {
      res.json({ success: true, message: '문의가 성공적으로 전송되었습니다.' });
    } else {
      res.status(500).json({ success: false, message: '이메일 전송에 실패했습니다.', error: result.error });
    }
  } catch (error) {
    console.error('Inquiry endpoint error:', error);
    res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.', error: error.message });
  }
});

// 지원하기 endpoint
app.post('/send-support', async (req, res) => {
  try {
    console.log('Received support application:', req.body);
    
    const { formType, name, age, phone, email, address, message } = req.body;

    // 이메일 제목 설정
    const subjectMap = {
      student: '교육생 신청서',
      volunteer: '자원봉사 신청서',
      partner: '파트너십 문의서'
    };

    const subject = subjectMap[formType] || '지원 신청서';

    const mailOptions = {
      from: 'lhmy.kr@gmail.com',
      to: 'lhmy.kr@gmail.com',
      subject: subject,
      html: `
        <h2>${subject}</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>나이:</strong> ${age || '미입력'}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email || '미입력'}</p>
        <p><strong>주소:</strong> ${address || '미입력'}</p>
        <p><strong>메시지:</strong></p>
        <p>${message || '미입력'}</p>
        <hr>
        <p><small>신청 시간: ${new Date().toLocaleString('ko-KR')}</small></p>
      `
    };

    const result = await sendEmail(mailOptions);
    
    if (result.success) {
      res.json({ success: true, message: '신청서가 성공적으로 전송되었습니다.' });
    } else {
      res.status(500).json({ success: false, message: '이메일 전송에 실패했습니다.', error: result.error });
    }
  } catch (error) {
    console.error('Support endpoint error:', error);
    res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.', error: error.message });
  }
});

// 후원하기 endpoint
app.post('/send-donation', async (req, res) => {
  try {
    console.log('Received donation:', req.body);
    
    const { donationType, amount, name, phone, email, message } = req.body;

    const donationTypeText = donationType === 'monthly' ? '정기 후원' : '일시 후원';

    // 관리자에게 보내는 이메일
    const adminMailOptions = {
      from: 'lhmy.kr@gmail.com',
      to: 'lhmy.kr@gmail.com',
      subject: '후원 신청서',
      html: `
        <h2>후원 신청서</h2>
        <p><strong>후원 유형:</strong> ${donationTypeText}</p>
        <p><strong>후원 금액:</strong> ${parseInt(amount).toLocaleString()}원</p>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>메시지:</strong></p>
        <p>${message || '미입력'}</p>
        <hr>
        <p><small>신청 시간: ${new Date().toLocaleString('ko-KR')}</small></p>
      `
    };

    // 후원자에게 보내는 확인 이메일
    const donorMailOptions = {
      from: 'lhmy.kr@gmail.com',
      to: email,
      subject: '등대 말레이시아 후원 신청 확인',
      html: `
        <h2>후원 신청이 접수되었습니다</h2>
        <p>안녕하세요 ${name}님,</p>
        <p>등대 말레이시아에 ${donationTypeText} 신청을 해주셔서 진심으로 감사합니다.</p>
        
        <h3>신청 내용</h3>
        <p><strong>후원 유형:</strong> ${donationTypeText}</p>
        <p><strong>후원 금액:</strong> ${parseInt(amount).toLocaleString()}원</p>
        <p><strong>신청 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
        
        <h3>계좌 정보</h3>
        <p><strong>카카오뱅크:</strong> 333342985064 (등대말레이시아)</p>
        <p><strong>PayPal:</strong> lhmy.kr@gmail.com</p>
        
        <p>입금 후 연락처(+60 11-2079-8850)로 연락주시면 확인 도와드리겠습니다.</p>
        <p>소중한 마음에 다시 한번 감사드립니다.</p>
        
        <p>등대 말레이시아 드림<br>
        이메일: lhmy.kr@gmail.com<br>
        전화: +60 11-2079-8850</p>
      `
    };

    // 관리자 이메일 전송
    const adminResult = await sendEmail(adminMailOptions);
    
    if (!adminResult.success) {
      return res.status(500).json({ 
        success: false, 
        message: '관리자 이메일 전송에 실패했습니다.',
        error: adminResult.error 
      });
    }

    // 후원자 확인 이메일 전송 (이메일이 있는 경우에만)
    if (email) {
      const donorResult = await sendEmail(donorMailOptions);
      
      if (donorResult.success) {
        res.json({ 
          success: true, 
          message: '후원 신청이 성공적으로 전송되었습니다. 확인 이메일을 보내드렸습니다.' 
        });
      } else {
        res.json({ 
          success: true, 
          message: '후원 신청이 전송되었지만 확인 이메일 전송에 실패했습니다.',
          warning: donorResult.error
        });
      }
    } else {
      res.json({ 
        success: true, 
        message: '후원 신청이 성공적으로 전송되었습니다.' 
      });
    }
  } catch (error) {
    console.error('Donation endpoint error:', error);
    res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.', error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    emailConfig: {
      user: process.env.EMAIL_USER || 'lhmy.kr@gmail.com',
      configured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS)
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    success: false, 
    message: '서버 내부 오류가 발생했습니다.',
    error: error.message 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Email configured for: ${process.env.EMAIL_USER || 'lhmy.kr@gmail.com'}`);
});