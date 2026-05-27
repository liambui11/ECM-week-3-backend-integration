// ErrorBoundary component to capture rendering crashes inside UI grids safely (Rule #2).

import React, { Component, ErrorInfo, ReactNode } from 'react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-card" role="alert">
          <span className="error-icon">Error</span>
          <h3 className="error-title">{this.props.fallbackTitle || 'Widget Load Failed'}</h3>
          <p className="error-msg">{this.state.error?.message || 'Internal display error.'}</p>
          <button className="error-reset" onClick={this.handleReset}>
            Refresh Component
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
