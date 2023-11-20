import { LoremIpsum } from "lorem-ipsum";
import React from "react";

export const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});


export const RealDealContext = React.createContext<any>({
    selectedNews: {
      selectedNews: null,
      setSelectedNews: () => null
    },
    register: {
        isUserRegistered: null,
        setIsUserRegistered: () => null,
    },
    joinRoom: {
        uerJoinedRoom: null,
        setUserJoinedRoom: () => null,
    },
    joinDialog: {
        isOpenJoinDialog: null,
        toggleIsOpenDialog: () => null,
    },
    detailsDialog: {
        isOpenDetailsDialog: null,
        setIsOpenDetailsDialog: () => null,
    },
    processJoinRoom: {
        isProcessJoinRoom: null,
        setIsProcessJoinRoom: () => null,
    },
    realEstatePosts: {
      posts: null,
      setPosts: () => null
    }
});

export interface IContext {
    translate: any;
    selectedNews: {
      selectedNews: any,
      setSelectedNews: React.Dispatch<React.SetStateAction<any>>
    },
    selectedRealEstate: {
      selectedREs: any,
      setSelectedREs: React.Dispatch<React.SetStateAction<any>>
    },
    register: {
      isUserRegistered: boolean;
      setIsUserRegistered: React.Dispatch<React.SetStateAction<boolean>>;
    };
    creatingPayment: {
      userCreatingPayment: any;
      setUserCreatingPayment: React.Dispatch<React.SetStateAction<any>>;
    };
    joinRoom: {
      userJoinedRoom: any;
      setUserJoinedRoom: React.Dispatch<React.SetStateAction<any>>;
      rooms: ["ROOM A"];
    };
    joinDialog: {
      isOpenJoinDialog: boolean;
      toggleIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
    };    
    detailsDialog: {
      isOpenDetailsDialog: boolean;
      setIsOpenDetailsDialog: React.Dispatch<React.SetStateAction<boolean>>;
    };
    processJoinRoom: {
      isProcessJoinRoom: boolean;
      setIsProcessJoinRoom: React.Dispatch<React.SetStateAction<boolean>>;
    };
    realEstatePosts: {
      posts: any[],
      setPosts: React.Dispatch<React.SetStateAction<any>>
    }
    handleRedirect:{
      redirect: () => void,
      setUrl: React.Dispatch<React.SetStateAction<string>>
    };
}