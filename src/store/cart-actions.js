import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
    return async(dispatch) => {
        
        const fetchHandler = async() => {
            const res = await fetch(process.env.REACT_APP_FIREBASE_URL);
            const data = await res.json();

            return data;
        }

        try {
          const cartData = await fetchHandler();
          dispatch(cartActions.replaceData(cartData));
        } catch (error) {
          dispatch(
            uiActions.showNotification({
              open: true,
              message: "sent request failed",
              type: "error",
            })
          );
        }
    }
}

export const sendCardData = (cart) => {
    return async (dispatch) => {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "sending request",
          type: "warning",
        })
      );
  
      const sendRequest = async () => {
        const res = await fetch(
            process.env.REACT_APP_FIREBASE_URL,
          {
            method: "PUT",
            body: JSON.stringify(cart),
          }
        );
        const data = await res.json();
        console.log({ data });
        dispatch(
          uiActions.showNotification({
            open: true,
            message: "sent request to database successfully",
            type: "success",
          })
        );
      };
  
      try {
        await sendRequest();
      } catch (error) {
        dispatch(
          uiActions.showNotification({
            open: true,
            message: "sent request failed",
            type: "error",
          })
        );
      }
    };
  };
