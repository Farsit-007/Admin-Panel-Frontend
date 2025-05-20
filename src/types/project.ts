
type TStatus = "PUBLISH" | "UNPUBLISH"
export interface TProject {
  _id : string;
  name: string;
  liveUrl : string;
  githubUrl : string;
  description: string;
  features: string[];
  imageUrl: string[];
  tech: [];
  status: TStatus;
}