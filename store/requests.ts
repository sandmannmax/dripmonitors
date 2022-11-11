import axios from 'axios';

export const getRequest = async ({ url, auth }) => {
  let accessToken = auth.strategy.token.get();
  let response;
  try {
    response = await axios.get(url, {headers: {'Authorization': accessToken}});
    return { data: response.data };
  } catch (err) {
    if (err && err.response && err.response.status == 401) {
      await auth.strategy.refreshController.handleRefresh();
      accessToken = auth.strategy.token.get();
      try {
        response = await axios.get(url, {headers: {'Authorization': accessToken}});
        return { data: response.data };
      } catch (err) {
        if (err && err.response && err.response.status == 401) {
          auth.logout();
        } else if (err && err.response && err.response.data && err.response.data.message)
          return { message: err.response.data.message };    
        else {
          console.log(JSON.stringify(err));
          return;  
        }
      }
    } else if (err && err.response && err.response.data && err.response.data.message)
      return { message: err.response.data.message };    
    else {
      console.log(JSON.stringify(err));
      return;
    }
  }
};

export const postRequest = async ({ url, data, auth }) => {
  let accessToken = auth.strategy.token.get();
  let response;
  try {
    response = await axios.post(url, data, {headers: {'Authorization': accessToken}});
    return { data: response.data };
  } catch (err) {
    if (err && err.response && err.response.status == 401) {
      await auth.strategy.refreshController.handleRefresh();
      accessToken = auth.strategy.token.get();
      try {
        response = await axios.post(url, data, {headers: {'Authorization': accessToken}});
        return { data: response.data };
      } catch (err) {
        if (err && err.response && err.response.status == 401) {
          auth.logout();
        } else if (err && err.response && err.response.data && err.response.data.message)
          return { message: err.response.data.message };    
        else {
          console.log(JSON.stringify(err));
          return;  
        }
      }
    } else if (err && err.response && err.response.data && err.response.data.message)
      return { message: err.response.data.message };    
    else {
      console.log(JSON.stringify(err));
      return;
    }
  }
};

export const patchRequest = async ({ url, data, auth }) => {
  let accessToken = auth.strategy.token.get();
  let response;
  try {
    response = await axios.patch(url, data, {headers: {'Authorization': accessToken}});
    return { data: response.data };
  } catch (err) {
    if (err && err.response && err.response.status == 401) {
      await auth.strategy.refreshController.handleRefresh();
      accessToken = auth.strategy.token.get();
      try {
        response = await axios.patch(url, data, {headers: {'Authorization': accessToken}});
        return { data: response.data };
      } catch (err) {
        if (err && err.response && err.response.status == 401) {
          auth.logout();
        } else if (err && err.response && err.response.data && err.response.data.message)
          return { message: err.response.data.message };    
        else {
          console.log(JSON.stringify(err));
          return;  
        }
      }
    } else if (err && err.response && err.response.data && err.response.data.message)
      return { message: err.response.data.message };    
    else {
      console.log(JSON.stringify(err));
      return;
    }
  }
};

export const deleteRequest = async ({ url, auth }) => {
  let accessToken = auth.strategy.token.get();
  let response;
  try {
    response = await axios.delete(url, {headers: {'Authorization': accessToken}});
    return { data: { ...response.data, deleted: true }};
  } catch (err) {
    if (err && err.response && err.response.status == 401) {
      await auth.strategy.refreshController.handleRefresh();
      accessToken = auth.strategy.token.get();
      try {
        response = await axios.delete(url, {headers: {'Authorization': accessToken}});
        return { data: { ...response.data, deleted: true }};
      } catch (err) {
        if (err && err.response && err.response.status == 401) {
          auth.logout();
        } else if (err && err.response && err.response.data && err.response.data.message)
          return { message: err.response.data.message };    
        else {
          console.log(JSON.stringify(err));
          return;  
        }
      }
    } else if (err && err.response && err.response.data && err.response.data.message)
      return { message: err.response.data.message };    
    else {
      console.log(JSON.stringify(err));
      return;
    }
  }
};