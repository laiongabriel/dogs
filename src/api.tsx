interface BodyType {
   username?: string;
   password?: string;
   url?: string;
   email?: string;
   login?: string;
   key?: string;
}

export const API_URL = "https://dogsapi.origamid.dev/json";

export function TOKEN_POST(body: BodyType) {
   return {
      url: API_URL + "/jwt-auth/v1/token",
      options: {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(body),
      },
   };
}

export function VALIDADTE_TOKEN_POST(token: string) {
   return {
      url: API_URL + "/jwt-auth/v1/token/validate",
      options: {
         method: "POST",
         headers: {
            Authorization: `Bearer ${token}`,
         },
      },
   };
}

export function USER_GET(token: string) {
   return {
      url: API_URL + "/api/user",
      options: {
         method: "GET",
         headers: {
            Authorization: `Bearer ${token}`,
         },
      },
   };
}

export function USER_POST(body: BodyType) {
   return {
      url: API_URL + "/api/user",
      options: {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(body),
      },
   };
}

export function PHOTO_POST(formData: FormData, token: string) {
   return {
      url: API_URL + "/api/photo",
      options: {
         method: "POST",
         headers: {
            Authorization: `Bearer ${token}`,
         },
         body: formData,
      },
   };
}

export function PHOTOS_GET({
   page,
   total,
   user,
}: {
   page: number;
   total: number;
   user: number | string;
}) {
   return {
      url: `${API_URL}/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
      options: {
         method: "GET",
         cache: "no-store",
      },
   };
}

export function PHOTO_GET(photoId: number) {
   return {
      url: `${API_URL}/api/photo/${photoId}`,
      options: {
         method: "GET",
         cache: "no-store",
      },
   };
}

export function COMMENT_POST(photoId: number, body: {}) {
   return {
      url: `${API_URL}/api/comment/${photoId}`,
      options: {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
         },
         body: JSON.stringify(body),
      },
   };
}

export function PHOTO_DELETE(photoId: number) {
   return {
      url: `${API_URL}/api/photo/${photoId}`,
      options: {
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
         },
      },
   };
}

export function PASSWORD_LOST(body: BodyType) {
   return {
      url: `${API_URL}/api/password/lost`,
      options: {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(body),
      },
   };
}

export function PASSWORD_RESET(body: BodyType) {
   return {
      url: `${API_URL}/api/password/reset`,
      options: {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(body),
      },
   };
}

export function STATS_GET() {
   return {
      url: `${API_URL}/api/stats`,
      options: {
         method: "GET",
         headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
         },
      },
   };
}
