"use client";

import { useEffect, useState } from "react";
import { Link2, Copy, Trash2, LogOut, Clock, History } from "lucide-react";
import { userLogout } from "@/services/authServices";
import toastAlert from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  generateShortUrl,
  getUserUrlHistory,
  redirectUrl,
} from "@/services/urlServices";
import { logout } from "@/slice/userSlice";
import { useDispatch } from "react-redux";

interface ShortenedUrl {
  id: string;
  longUrl: string;
  shortUrl: string;
  date: string;
}

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isShortening, setIsShortening] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [urlHistory, setUrlHistory] = useState<ShortenedUrl[]>([]);

  const [toast, setToast] = useState("");
  const router = useRouter();
  const userId = useSelector((state: RootState) => state.user?.id);

  const dispatch = useDispatch()

  useEffect(() => {
    getUserUrlHistory(userId ?? "").then((response) => {
      setUrlHistory(response.data.data.urls);
    });
  }, [shortenedUrl]);

  const isValidUrl = (urlString: string) => {
    try {
      const url = new URL(urlString);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleShorten = () => {
    if (!url.trim()) {
      toastAlert.error("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      toastAlert.error("Please enter a valid URL");
      return;
    }

    setIsShortening(true);
    setShowResult(false);

    generateShortUrl({
      userId: userId ?? "",
      url: url,
    }).then((response) => {
      setShortenedUrl(response.data.data);
      toastAlert.success(response.data.message);
      setIsShortening(false);
      setShowResult(true);
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toastAlert.success("Copied to clipboard!");
  };

  const deleteUrl = (id: string) => {
    setUrlHistory(urlHistory.filter((item) => item.id !== id));
    showToast("URL deleted");
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  const truncateUrl = (url: string, maxLength: number = 50) => {
    return url.length > maxLength ? url.substring(0, maxLength) + "..." : url;
  };

  useEffect(()=>{
    if(!userId){
      router.push('/auth/user/signin')
    }
  },[])

  function logoutUser() {
    userLogout().then((response) => {
      dispatch(logout())
      localStorage.removeItem("userDetails");
      toastAlert.success(response.data.message);
      router.push("/auth/user/signin");
    });
  }

  function redirect(userId: string, url: string) {
    window.location.href = url;
  }

  const userName = useSelector((state: RootState) => state.user?.userName);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-6 py-3 shadow-2xl">
            <p className="text-white font-medium">{toast}</p>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="relative z-10 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-2 rounded-lg">
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                Shortify
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                  {/* <span className="text-white text-sm font-semibold">JD</span> */}
                </div>
                <span className="text-white text-sm font-medium">
                  {userName}
                </span>
              </div>

              <button
                onClick={() => logoutUser()}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-sm p-2 rounded-full border border-white/10 transition-all duration-300 hover:scale-110"
              >
                <LogOut className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* URL Shortener Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/20">
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-2">
              Shorten Your Links
            </h1>
            <p className="text-purple-200 text-center mb-8">
              Create short, memorable links in seconds
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleShorten()}
                placeholder="Paste your long URL here..."
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <button
                onClick={handleShorten}
                disabled={isShortening}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isShortening ? "Shortening..." : "Shorten"}
              </button>
            </div>

            {showResult && (
              <div className="animate-fade-in bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <p className="text-purple-200 text-sm mb-2">
                  Your shortened URL:
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={shortenedUrl}
                    readOnly
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none"
                  />
                  <button
                    onClick={() => copyToClipboard(shortenedUrl)}
                    className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 rounded-lg transition-all duration-300 hover:scale-110"
                  >
                    <Copy className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* URL History Section */}
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <History className="w-6 h-6 text-purple-300" />
              <h2 className="text-2xl font-bold text-white">Recent Links</h2>
            </div>

            {urlHistory.length === 0 ? (
              <div className="text-center py-12">
                <Link2 className="w-16 h-16 text-purple-300/30 mx-auto mb-4" />
                <p className="text-purple-200/50 text-lg">
                  No shortened URLs yet
                </p>
                <p className="text-purple-300/30 text-sm">
                  Start by shortening your first link above
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                {urlHistory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-purple-300 flex-shrink-0" />
                          <span className="text-purple-200 text-sm">
                            {item.date}
                          </span>
                        </div>
                        <p
                          className="text-white/70 text-sm mb-2 truncate"
                          title={item.longUrl}
                        >
                          {truncateUrl(item.longUrl, 60)}
                        </p>
                        <p
                          onClick={() => redirect(userId ?? "", item.longUrl)}
                          className="text-purple-300 hover:text-purple-200 font-medium text-sm transition-colors"
                        >
                          {item.shortUrl}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => copyToClipboard(item.shortUrl)}
                          className="p-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 transition-all duration-300 hover:scale-110"
                          title="Copy link"
                        >
                          <Copy className="w-4 h-4 text-white" />
                        </button>
                        {/* <button
                          onClick={() => deleteUrl(item.id)}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm rounded-lg border border-red-400/20 transition-all duration-300 hover:scale-110"
                          title="Delete link"
                        >
                          <Trash2 className="w-4 h-4 text-red-300" />
                        </button> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
