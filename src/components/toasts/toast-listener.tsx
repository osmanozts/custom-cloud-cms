import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { clearToast } from "../../redux/toast-slice";

export const ToastListener: React.FC = () => {
  const toast = useToast();
  const dispatch: AppDispatch = useDispatch();
  const { title, description, status } = useSelector(
    (state: RootState) => state.toast
  );

  useEffect(() => {
    if (title && status) {
      toast({
        title,
        description,
        status,
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => dispatch(clearToast()),
      });
    }
  }, [title, description, status, toast, dispatch]);

  return null;
};
