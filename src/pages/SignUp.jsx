import { useState, useEffect, useRef } from "react";
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
import { getEmailCode, codeCheck, signup } from "@/api/userApi";
import JSConfetti from "js-confetti";
import Welcome from "@/components/Welcome";

function SignUp() {
  const [email, setEmail] = useState(""); // 가입메일
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState(""); // 인증코드
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCodeField, setShowCodeField] = useState(false); // 인증코드입력칸 제어
  const [mailError, setMailError] = useState("");
  const [codeText, setCodeText] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [mailText, setMailText] = useState("인증번호 받기");
  const [timerReset, setTimerReset] = useState(0); // 타이머 컴포넌트의 key로 사용

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePassword = (password) => {
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
      } catch (error) {
        if (error.request.status === 409) {
          setMailError("해당 메일로 가입된 계정이 존재합니다.");
          setShowCodeField(false);
        }
        if (error.request.status === 400) {
          setMailError("메일 형식이 잘못되었습니다.");
          setShowCodeField(false);
        }
        console.log(error);
      }
    } else {
      setMailError("메일 형식이 잘못되었습니다.");
      setShowCodeField(false);
    }
  };

  useEffect(() => {
    if (code.length === 6) callCodeCheck();
  }, [code]);

  useEffect(() => {
    if (password !== confirmPassword)
      setPasswordError("비밀번호가 일치하지 않습니다.");
    if (password === confirmPassword) setPasswordError("");
  }, [confirmPassword]);

  const callCodeCheck = async () => {
    try {
      const check = await codeCheck(email, code);
      if (check === "인증코드 일치") {
        setCodeText("☑️ 인증번호가 일치합니다.");
        setIsCorrect(true);
      }
    } catch (error) {
      if (error.request.status === 400) {
        setCodeText("⚠️ 인증번호가 일치하지 않습니다.");
        setIsCorrect(false);
      } else {
        console.log(error);
      }
    }
  };

  const confirmSignup = async () => {
    const requestBody = {
      email,
      password,
      confirmPassword,
      code,
    };
    if (
      validateEmail(email) &&
      validatePassword(password) &&
      isCorrect &&
      password === confirmPassword
    ) {
      try {
        const submit = await signup(requestBody);
        if (submit === "가입 완료") {
          callWelcome();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      if (!validatePassword(password)) {
        setPasswordError("비밀번호 규칙을 지켜주세요");
      }
    }
  };

  //Welcome 모달 컨트롤용
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const openWelcome = () => setIsWelcomeOpen(true);
  const closeWelcome = () => setIsWelcomeOpen(false);
  const jsConfettiRef = useRef(null);

  useEffect(() => {
    jsConfettiRef.current = new JSConfetti();
  }, []);
  const callWelcome = () => {
    openWelcome();
    jsConfettiRef.current.addConfetti({
      confettiColors: [
        "#dbeafe",
        "#bfdbfe",
        "#93c5fd",
        "#5AB2FF",
        "#60a5fa",
        "#2563eb",
      ],
      confettiNumber: 700,
    });
  };

  const labelStyle = "flex w-full max-w-sm items-start pr-2 pb-2 pt-2 text-sm";
  const errorStyle = "flex w-full max-w-sm items-start text-sm text-primary	";
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

        {codeText && <p className={errorStyle}>{codeText}</p>}
      </div>
      <p className={labelStyle}>비밀번호</p>
      <Input
        type="password"
        placeholder="**********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <p className="flex w-full max-w-sm items-start pt-3 pb-3 text-sm underline decoration-primary decoration-wavy decoration-2 underline-offset-4">
        비밀번호 규칙
      </p>
      <p className="flex w-full max-w-sm items-start text-sm">
        1. 비밀번호는 <strong> 8자 이상 15자 이하 </strong> 로 설정해야 합니다.
      </p>
      <p className="flex w-full max-w-sm items-start pb-3 text-sm">
        2. <strong>영문, 숫자, 특수문자</strong>만 사용할 수 있습니다.
      </p>
      <p className={labelStyle}>비밀번호 확인</p>
      <Input
        type="password"
        placeholder="**********"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {passwordError && <p className={errorStyle}>{passwordError}</p>}
      <div className="flex w-full max-w-sm items-center space-x-2 pt-3">
        <Button className="w-full" onClick={confirmSignup}>
          <KeyRound className="mr-2 h-4 w-4" /> 가입하기
        </Button>
      </div>
      <Welcome isOpen={isWelcomeOpen} onClose={closeWelcome} />
    </div>
  );
}

export default SignUp;
