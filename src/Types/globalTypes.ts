export interface UserData {
   data: {
      email: string;
      id: number;
      nome: string;
      username: string;
   };
}

export interface UserContextData {
   userLogin: (username: string, password: string) => Promise<void>;
   userLogout: () => void;
   data: UserData;
   error: string | null;
   loading: boolean;
   login: boolean | null;
}

export interface Photo {
   comments: {
      comment_ID: string;
      comment_agent: string;
      comment_approved: string;
      comment_author: string;
      comment_author_email: string;
      comment_author_url: string;
      comment_content: string;
      comment_date: string;
      comment_date_gmt: string;
      comment_post_ID: string;
      comment_type: string;
      user_id: string;
   }[];
   photo: {
      acessos: number;
      author: string;
      date: string;
      id: number;
      idade: string;
      peso: string;
      src: string;
      title: string;
      total_comments: string;
   };
}

export interface PhotoList {
   acessos: string;
   author: string;
   date: string;
   id: number;
   idade: string;
   peso: string;
   src: string;
   title: string;
   total_comments: string;
}
