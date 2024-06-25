// INFO: API call header configuration added here
export const headersData = async params => {
  return {
    headers: {
      'Content-Type': params.type ? params.type : 'application/json',
      Authorization: params?.token ? `Bearer ${params.token}` : '',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Authorization',
      'Accept-Language': params?.currentLanguageShortCut
        ? params?.currentLanguageShortCut
        : '',
    },
  };
};
