import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ini, pwStrength } from '../../utils/helper';


const SettingsPanel = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { authToast } = useToast();

  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOldPw('');
      setNewPw('');
      setConfirmPw('');
      setMsg({ text: '', type: '' });
      setShowOld(false);
      setShowNew(false);
      setShowConfirm(false);
    }
  }, [isOpen]);

  const pw = pwStrength(newPw);

 const handleChangePassword = async () => {
  setMsg({ text: '', type: '' });

  if (!oldPw || !newPw || !confirmPw) {
    setMsg({ text: 'All password fields are required', type: 'err' });
    return;
  }

  if (newPw !== confirmPw) {
    setMsg({ text: 'Passwords do not match', type: 'err' });
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: user.email,            
        currentPassword: oldPw,       
        newPassword: newPw
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    setMsg({ text: "Password updated successfully ✅", type: "ok" });

  } catch (err) {
    setMsg({
      text: err.message || "Failed to change password",
      type: "err"
    });
  }
};


 const handleDeleteAccount = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/delete-account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: user.email
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    alert("Account deleted successfully ✅");

    // 🔥 IMPORTANT PART
    logout();        // user remove
    onClose();       // settings close

  } catch (err) {
    alert(err.message);
  }
};

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="panel-overlay open" onClick={handleOverlayClick}>
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">⚙ Account Settings</div>
          <button className="panel-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="panel-body">
          <div className="panel-avatar-row">
            <div className="panel-av" style={{ background: '#305dda' }}>
              {ini(user?.name || '?')}
            </div>
            <div className="panel-av-info">
              <div className="pav-name">{user?.name || '—'}</div>
              <div className="pav-email">{user?.email || '—'}</div>
              <div className="pav-since">
                Member since {user?.createdAt || '—'}
              </div>
            </div>
          </div>

          {msg.text && (
            <div className={`panel-msg show ${msg.type}`}>{msg.text}</div>
          )}

          <div className="panel-section">
            <div className="panel-section-title">🔑 Change Password</div>

            <div className="panel-field">
              <label className="panel-label">Current Password</label>
              <div className="pw-toggle" style={{ position: 'relative' }}>
                <input
                  className="panel-input"
                  type={showOld ? 'text' : 'password'}
                  placeholder="Enter current password"
                  style={{ paddingRight: 42 }}
                  value={oldPw}
                  onChange={(e) => setOldPw(e.target.value)}
                />
                <button
                  type="button"
                  className="pw-eye"
                  onClick={() => setShowOld((p) => !p)}
                >
                  {showOld ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <div className="panel-field">
              <label className="panel-label">New Password</label>
              <div className="pw-toggle" style={{ position: 'relative' }}>
                <input
                  className="panel-input"
                  type={showNew ? 'text' : 'password'}
                  placeholder="Min 6 characters"
                  style={{ paddingRight: 42 }}
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                />
                <button
                  type="button"
                  className="pw-eye"
                  onClick={() => setShowNew((p) => !p)}
                >
                  {showNew ? '🙈' : '👁'}
                </button>
              </div>
              {newPw && (
                <>
                  <div
                    className="pw-bar"
                    style={{ background: pw.color, width: pw.width }}
                  />
                  <div className="pw-lbl">{pw.label}</div>
                </>
              )}
            </div>

            <div className="panel-field">
              <label className="panel-label">Confirm New Password</label>
              <div className="pw-toggle" style={{ position: 'relative' }}>
                <input
                  className="panel-input"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter new password"
                  style={{ paddingRight: 42 }}
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                />
                <button
                  type="button"
                  className="pw-eye"
                  onClick={() => setShowConfirm((p) => !p)}
                >
                  {showConfirm ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <button
              className="panel-btn"
              onClick={handleChangePassword}
              disabled={loading}
              style={{ marginBottom: 12 }}
            >
              {loading ? 'Updating...' : '🔑 Update Password'}
            </button>
          </div>

          <div className="panel-section">
            <div className="panel-section-title">🚫 Danger Zone</div>
            <button
              className="panel-btn panel-btn-danger"
              onClick={handleDeleteAccount}
            >
              🗑 Delete My Account
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
