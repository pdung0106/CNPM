import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logoUTH from "../assets/logo_uth.png";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Bắt buộc email UTH
    if (!email.endsWith("@ut.edu.vn")) {
      setError("Vui lòng sử dụng email trường (@ut.edu.vn)");
      return;
    }

    // ✅ Demo phân role (sau này thay bằng DB + Docker)
    let role = "student";
    if (email.startsWith("hod")) role = "hod";          // Head of Department
    else if (email.startsWith("aa")) role = "aa";       // Academic Affairs
    else if (email.startsWith("lect")) role = "lecturer";

    // Lưu tạm thông tin đăng nhập
    localStorage.setItem(
      "user",
      JSON.stringify({ email, role })
    );

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo trường */}
        <img src={logoUTH} alt="UTH Logo" className="login-logo" />

        {/* Tiêu đề */}
        <h2>Đăng nhập hệ thống</h2>

        {/* Thông báo lỗi */}
        {error && <p className="error">{error}</p>}

        {/* Form login */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email (@ut.edu.vn)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Đăng nhập</button>
        </form>

        {/* Link đăng ký */}
        <p className="signup-link">
          Chưa có tài khoản? <a href="/signup">Đăng ký</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
