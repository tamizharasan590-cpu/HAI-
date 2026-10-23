import React from 'react';

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[HAI ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FAFAF5',
          fontFamily: 'Inter, sans-serif',
          padding: '2rem'
        }}>
          <div style={{
            maxWidth: '600px',
            background: 'white',
            border: '1px solid #fca5a5',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
            <h2 style={{ color: '#991b1b', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.75rem' }}>
              HAI Platform — Startup Error
            </h2>
            <p style={{ color: '#374151', marginBottom: '1rem', fontSize: '0.875rem' }}>
              A runtime error occurred. See details below:
            </p>
            <pre style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '1rem',
              fontSize: '0.75rem',
              color: '#b91c1c',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all'
            }}>
              {this.state.error?.toString()}
              {'\n'}
              {this.state.error?.stack}
            </pre>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '1rem',
                background: '#174A32',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.6rem 1.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
