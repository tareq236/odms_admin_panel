export const CallApi = {
  fetchUserList,
  fetchClusterList,
  fetchUserGroupList,
  fetchActivityForMap
};

const _baseUrl = 'http://174.138.120.140:6042'

function fetchUserGroupList(sap_user_code:string, designation_id:string) {
    let data = {
        "work_area_t": sap_user_code,
        "designation_id": designation_id
    };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(_baseUrl + "/api/v1/user_group_list", requestOptions)
        .then(response => response.json())
        .then((result) => {
            return result
        });
};

function fetchUserList(sap_user_code:string, designation_id:string) {
    return fetch(_baseUrl + "/api/v1/user_list")
        .then(response => response.json())
        .then((result) => {
            return result
        });
}

function fetchClusterList() {
    // let url = "";
    // if(window.location.hostname !== "localhost"){
    //     url = "/api/v1"
    // }
    return fetch(_baseUrl+"api/v1/reports/cluster_list")
        .then(response => response.json())
        .then((result) => {
            return result
        });
}

function fetchActivityForMap(sap_user_code: string, date: string) {
  return fetch(_baseUrl +  `/api/v1/reports/activity_for_map/${sap_user_code}/${date}`)
    .then(response => response.json())
    .then((result) => {
      return result
    });
}
