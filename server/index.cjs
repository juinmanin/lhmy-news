const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gmail 이메일 설정
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'lhmy.kr@gmail.com',
    pass: 'lhmykr1004'
  }
});

// 이메일 설정 확인
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Gmail 설정 오류:', error);
    console.log('📧 Gmail 앱 비밀번호가 필요할 수 있습니다.');
  } else {
    console.log('✅ Gmail 서버 연결 성공');
  }
});

// 이메일 전송 헬퍼 함수
const sendEmail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ 이메일 전송 성공:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ 이메일 전송 실패:', error);
    return { success: false, error: error.message };
  }
};

// 문의하기 API
app.post('/send-inquiry', async (req, res) => {
  try {
    console.log('📨 문의하기 요청:', req.body);
    
    const { name, phone, email, inquiryType, message } = req.body;

    // 필수 필드 검증
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: '필수 정보가 누락되었습니다.' 
      });
    }

    const mailOptions = {
      from: 'lhmy.kr@gmail.com',
      to: 'lhmy.kr@gmail.com',
      subject: `[홈페이지 문의] ${inquiryType || '일반 문의'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            홈페이지 문의
          </h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>이름:</strong> ${name}</p>
            <p><strong>연락처:</strong> ${phone}</p>
            <p><strong>이메일:</strong> ${email}</p>
            <p><strong>문의 유형:</strong> ${inquiryType || '미선택'}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #1e40af;">메시지:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #3b82f6; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <hr style="margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">
            문의 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
          </p>
        </div>
      `
    };

    const result = await sendEmail(mailOptions);
    
    if (result.success) {
      res.json({ 
        success: true, 
        message: '문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: '이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.',
        error: result.error 
      });
    }
  } catch (error) {
    console.error('❌ 문의하기 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다. 관리자에게 문의해주세요.',
      error: error.message 
    });
  }
});

// 지원하기 API
app.post('/send-support', async (req, res) => {
  try {
    console.log('📨 지원하기 요청:', req.body);
    
    const { formType, name, age, phone, email, address, message } = req.body;

    // 필수 필드 검증
    if (!formType || !name || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: '필수 정보가 누락되었습니다.' 
      });
    }

    // 신청 유형별 제목 설정
    const subjectMap = {
      student: '🎓 교육생 신청서',
      volunteer: '🤝 자원봉사 신청서',
      partner: '🏢 파트너십 문의서'
    };

    const subject = subjectMap[formType] || '지원 신청서';

    const mailOptions = {
      from: 'lhmy.kr@gmail.com',
      to: 'lhmy.kr@gmail.com',
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            ${subject}
          </h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>이름:</strong> ${name}</p>
            <p><strong>나이:</strong> ${age || '미입력'}</p>
            <p><strong>연락처:</strong> ${phone}</p>
            <p><strong>이메일:</strong> ${email || '미입력'}</p>
            <p><strong>주소:</strong> ${address || '미입력'}</p>
          </div>
          ${message ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #1e40af;">메시지:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #3b82f6; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          ` : ''}
          <hr style="margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">
            신청 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
          </p>
        </div>
      `
    };

    const result = await sendEmail(mailOptions);
    
    if (result.success) {
      res.json({ 
        success: true, 
        message: '신청서가 성공적으로 전송되었습니다. 검토 후 연락드리겠습니다.' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: '이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.',
        error: result.error 
      });
    }
  } catch (error) {
    console.error('❌ 지원하기 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다. 관리자에게 문의해주세요.',
      error: error.message 
    });
  }
});

// 후원하기 API
app.post('/send-donation', async (req, res) => {
  try {
    console.log('📨 후원하기 요청:', req.body);
    
    const { donationType, amount, name, phone, email, message } = req.body;

    // 필수 필드 검증
    if (!donationType || !amount || !name || !phone || !email) {
      return res.status(400).json({ 
        success: false, 
        message: '필수 정보가 누락되었습니다.' 
      });
    }

    const donationTypeText = donationType === 'monthly' ? '정기 후원' : '일시 후원';
    const formattedAmount = parseInt(amount).toLocaleString();

    // 관리자에게 보내는 이메일
    const adminMailOptions = {
      from: 'lhmy.kr@gmail.com',
      to: 'lhmy.kr@gmail.com',
      subject: `💝 후원 신청서 - ${donationTypeText}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            💝 후원 신청서
          </h2>
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0;">후원 정보</h3>
            <p><strong>후원 유형:</strong> ${donationTypeText}</p>
            <p><strong>후원 금액:</strong> ${formattedAmount}원</p>
          </div>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">후원자 정보</h3>
            <p><strong>이름:</strong> ${name}</p>
            <p><strong>연락처:</strong> ${phone}</p>
            <p><strong>이메일:</strong> ${email}</p>
          </div>
          ${message ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #1e40af;">메시지:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #3b82f6; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          ` : ''}
          <hr style="margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">
            신청 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
          </p>
        </div>
      `
    };

    // 후원자에게 보내는 확인 이메일
    const donorMailOptions = {
      from: 'lhmy.kr@gmail.com',
      to: email,
      subject: '등대 말레이시아 후원 신청 확인',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            후원 신청이 접수되었습니다
          </h2>
          <p>안녕하세요 <strong>${name}</strong>님,</p>
          <p>등대 말레이시아에 ${donationTypeText} 신청을 해주셔서 진심으로 감사합니다.</p>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">신청 내용</h3>
            <p><strong>후원 유형:</strong> ${donationTypeText}</p>
            <p><strong>후원 금액:</strong> ${formattedAmount}원</p>
            <p><strong>신청 시간:</strong> ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
          </div>
          
          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #065f46; margin-top: 0;">💳 계좌 정보</h3>
            <p><strong>카카오뱅크:</strong> 333342985064 (등대말레이시아)</p>
            <p><strong>PayPal:</strong> lhmy.kr@gmail.com</p>
          </div>
          
          <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">📞 입금 확인</h3>
            <p>입금 후 연락처 <strong>+60 11-2079-8850</strong>로 연락주시면 확인 도와드리겠습니다.</p>
          </div>
          
          <p>소중한 마음에 다시 한번 감사드립니다.</p>
          
          <hr style="margin: 20px 0;">
          <div style="color: #6b7280; font-size: 14px;">
            <p><strong>등대 말레이시아 드림</strong></p>
            <p>📧 이메일: lhmy.kr@gmail.com</p>
            <p>📞 전화: +60 11-2079-8850</p>
            <p>🏠 주소: 15-1F, Jalan Perubatan 4, Taman Pandan Indah, 55100 Kuala Lumpur</p>
          </div>
        </div>
      `
    };

    // 관리자 이메일 전송
    const adminResult = await sendEmail(adminMailOptions);
    
    if (!adminResult.success) {
      return res.status(500).json({ 
        success: false, 
        message: '이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.',
        error: adminResult.error 
      });
    }

    // 후원자 확인 이메일 전송
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
  } catch (error) {
    console.error('❌ 후원하기 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다. 관리자에게 문의해주세요.',
      error: error.message 
    });
  }
});

// 서버 상태 확인 API
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    server: 'Lighthouse Malaysia Email Server',
    emailConfig: {
      user: 'lhmy.kr@gmail.com',
      service: 'gmail'
    }
  });
});

// 404 에러 처리
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: '요청한 엔드포인트를 찾을 수 없습니다.' 
  });
});

// 전역 에러 처리
app.use((error, req, res, next) => {
  console.error('❌ 서버 에러:', error);
  res.status(500).json({ 
    success: false, 
    message: '서버 내부 오류가 발생했습니다.',
    error: error.message 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다`);
  console.log(`📧 Gmail 계정: lhmy.kr@gmail.com`);
  console.log(`🌐 CORS 허용: http://localhost:5173`);
  console.log(`💡 서버 상태 확인: http://localhost:${PORT}/health`);
});