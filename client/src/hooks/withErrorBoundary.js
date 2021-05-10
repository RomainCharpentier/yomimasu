import React, { Component } from "react";

function withErrorBoundary(WrappedComponent, Api) {
  return class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, response: null, loading: false };
    }
    async componentDidMount() {
      try {
        this.setState({
          loading: true
        });
        const response = await Api;

        this.setState({
          loading: false,
          response
        });
      } catch (error) {
        // throw error here
        this.setState({
          loading: false
        });
      }
    }
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }

      return (
        <WrappedComponent
          response={this.state.response}
          loading={this.state.loading}
          {...this.props}
        />
      );
    }
  };
}

export default withErrorBoundary;