import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary caught error]:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return typeof this.props.fallback === 'function'
          ? this.props.fallback({ error: this.state.error, reset: this.handleReset })
          : this.props.fallback;
      }

      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 bg-amber-50/30">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-amber-200/60 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-100/80 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-black text-slate-900 mb-2 font-brand-display">
              Oops! Something went wrong
            </h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              We encountered an unexpected glitch while loading this section. You can try refreshing or return to the homepage.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div className="mb-6 p-3 bg-rose-50 text-rose-800 text-xs rounded-xl font-mono text-left overflow-x-auto max-h-32 border border-rose-200">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#13805B] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0E6346] transition-colors shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </button>

              <a
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Go to Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
