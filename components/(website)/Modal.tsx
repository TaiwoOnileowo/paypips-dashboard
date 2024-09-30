import { ModalBody, ModalContent } from "@/components/ui/AnimatedModal";
import ModalForm from "./ModalForm";
const Modal = () => {
  return (
    <ModalBody>
      <ModalContent>
        <h1 className="text-2xl font-bold text-center">Get Started</h1>
        <ModalForm />
      </ModalContent>
    </ModalBody>
  );
};

export default Modal;
