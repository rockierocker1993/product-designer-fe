/**
 * API Utils - Generic utilities for API calls
 */
export { toBaseResponse } from './model/baseResponse';

// Loading state management
let loadingElement = null;

/**
 * Show loading indicator
 */
export const showLoading = () => {
  if (!loadingElement) {
    loadingElement = document.createElement('div');
    loadingElement.id = 'api-loading-overlay';
    loadingElement.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      ">
        <div style="
          background: white;
          padding: 20px 40px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        ">
          <div style="
            border: 4px solid #f3f3f3;
            border-top: 4px solid #084D42;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          "></div>
          <span style="font-size: 16px; color: #333;">Loading...</span>
        </div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    document.body.appendChild(loadingElement);
  }
};

/**
 * Hide loading indicator
 */
export const hideLoading = () => {
  if (loadingElement && loadingElement.parentNode) {
    loadingElement.parentNode.removeChild(loadingElement);
    loadingElement = null;
  }
};

/**
 * Handle API errors and show popup
 * @param {Response} response - Fetch response object
 */
export const handleApiError = async (response) => {
  let errorMessage = `HTTP error! status: ${response.status}`;

  try {
    const errorData = await response.json();
    if (errorData.message) {
      errorMessage = errorData.message;
    }
  } catch (e) {
    // If response body is not JSON, use default message
  }

  // Show popup alert
  alert(`Error: ${errorMessage}`);

  throw new Error(errorMessage);
};

/**
 * Generic API request wrapper with loading and error handling
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options (method, headers, body, etc.)
 * @param {boolean} showLoadingIndicator - Whether to show loading indicator (default: true)
 * @returns {Promise<any>} API response data
 */
export const apiRequest = async (url, options = {}, showLoadingIndicator = true) => {
  if (showLoadingIndicator) {
    showLoading();
  }

  try {
    const isFormDataPayload = options.body instanceof FormData;
    const defaultHeaders = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken') || 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwcm9kdWN0LWRlc2lnbmVyLWJlIiwic3ViIjoiaWtoc2FuZmFkbHkiLCJpYXQiOjE3OTQwMjU2ODQsInNjb3BlIjoiIn0.tTlqkFDoQ9srELHf3_hgomvVaomwivkeeraYMDfStWo'}`,
      ...(isFormDataPayload ? {} : { 'Content-Type': 'application/json' }),
    };

    const defaultOptions = {
      method: 'GET',
      headers: defaultHeaders,
      mode: 'cors',
      credentials: 'omit',
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {}),
      },
    };

    // Browser must define multipart boundary for FormData.
    if (isFormDataPayload && mergedOptions.headers['Content-Type']) {
      delete mergedOptions.headers['Content-Type'];
    }

    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      await handleApiError(response);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  } finally {
    if (showLoadingIndicator) {
      hideLoading();
    }
  }
};
