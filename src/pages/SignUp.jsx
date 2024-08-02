import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { KeyRound } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import { getEmailCode } from "@/api/userApi";

function SignUp() {
  const [email, setEmail] = useState(""); // 가입메일
  const [code, setCode] = useState(""); // 인증코드
  const [showCodeField, setShowCodeField] = useState(false); // 인증코드입력칸 제어
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [mailText, setMailText] = useState("인증번호 받기");
  const [timerReset, setTimerReset] = useState(0); // 타이머 컴포넌트의 key로 사용
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const vlidatePassword = (password) => {
    const regex = /^[a-zA-Z0-9_!@#$%&'*+/=?`{|}~^.-]{8,15}$/;
    return regex.test(password);
  };

  const getCode = async () => {
    const requestBody = {
      email,
    };
    if (validateEmail(email)) {
      try {
        const EmailCode = await getEmailCode(requestBody);
        setMailText("인증번호 재요청");
        setShowCodeField(true);
        setMailError("");
        setIsTimerActive(true); // 타이머 활성화
        setTimerReset((prevKey) => prevKey + 1); // 타이머 key 증가
        console.log(EmailCode);
      } catch (error) {
        // 에러 처리
        console.log(error);
      }
      // 이메일 정규식 통과하면 서버에 메일인증 요청
      // 1. 이메일 중복이면 에러로 빠지기
      // 2. 유효한 이메일이면 인증코드 입력칸 표시
    } else {
      setMailError("메일주소가 잘못되었습니다.");
      setShowCodeField(false);
    }
  };

  const handleTimerComplete = () => {
    setIsTimerActive(false);
    // 여기에 인증 시간 만료 처리 로직 추가
  };

  const labelStyle = "flex w-full max-w-sm items-start pr-2 pb-2 pt-2 text-sm";
  const errorStyle = "flex w-full max-w-sm items-start text-sm text-primary";
  return (
    <div className="flex flex-col items-center w-full">
      <img src="../icon/LogoBlue.png" alt="logo" className="h-20 mb-10" />
      <p className={labelStyle}>이메일</p>
      <div className="flex w-full max-w-sm items-center space-x-2 pb-2">
        <Input
          type="text"
          placeholder="ex ) goods@ending.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="button" onClick={getCode} className="w-1/3">
          {mailText}
        </Button>
      </div>
      {mailError && <p className={errorStyle}>{mailError}</p>}

      {/* <div className="flex w-full items-center"> */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          showCodeField ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex  items-start">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={code}
            onChange={(value) => setCode(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {isTimerActive && (
            <CountdownTimer
              key={timerReset}
              isActive={isTimerActive}
              callerComponent="SignUp" // 이 부분을 추가
            />
          )}
        </div>
      </div>
      <p className={labelStyle}>비밀번호</p>
      <Input type="password" placeholder="**********" />
      <p className={labelStyle}>비밀번호 확인</p>
      <Input type="password" placeholder="**********" />
      {passwordError && <p className={errorStyle}>{passwordError}</p>}
      <div className="flex w-full max-w-sm items-center space-x-2 pt-3">
        <Button className="w-full">
          <KeyRound className="mr-2 h-4 w-4" /> 가입하기
        </Button>
      </div>
    </div>
  );
}

export default SignUp;
