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

function SignUp() {
  const [email, setEmail] = useState(""); // 가입메일
  const [code, setCode] = useState(""); // 인증코드
  const [showCodeField, setShowCodeField] = useState(false); // 인증코드입력칸 제어
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const getCode = () => {
    // 이메일인증 버튼
    if (validateEmail(email)) {
      // 이메일 정규식 통과하면 서버에 메일인증 요청
      // 1. 이메일 중복이면 에러로 빠지기
      // 2. 유효한 이메일이면 인증코드 입력칸 표시
      setShowCodeField(true);
      setMailError("");
    } else {
      setMailError("메일주소가 잘못되었습니다.");
      setShowCodeField(false);
    }
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
        <Button type="button" onClick={getCode}>
          인증번호 받기
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
          <p className={labelStyle}>인증번호 입력</p>
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
