import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: string;
  info: string;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { hasError: false, error: "", info: "" };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const info = errorInfo.componentStack
      .toString()
      .split("\n")
      .map((el) => el.trim())
      .join("");

    this.setState({ error: error?.toString() || "", info: info || "" });
  }

  render() {
    const { error, hasError, info } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div>
          <div>Something went wrong</div>
          <div>{error}</div>
        </div>
      );
    }

    return children;
  }
}
