// BreadcrumbNav.tsx
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
} from "@chakra-ui/react";

interface BreadcrumbNavProps {
  path: string;
  onBreadcrumbClick: (newPath: string) => void;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  path,
  onBreadcrumbClick,
}) => {
  const linkColor = useColorModeValue("blue.500", "blue.200");
  return (
    <Breadcrumb
      mb={4}
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
    >
      <BreadcrumbItem onClick={() => onBreadcrumbClick("")}>
        <BreadcrumbLink cursor="pointer" color={linkColor}>
          Hauptverzeichnis
        </BreadcrumbLink>
      </BreadcrumbItem>
      {path
        .split("/")
        .filter(Boolean)
        .map((pathName, index) => {
          const newPath = path
            .split("/")
            .slice(0, index + 2)
            .join("/");

          return (
            <BreadcrumbItem
              key={index}
              onClick={() => onBreadcrumbClick(newPath)}
            >
              <BreadcrumbLink cursor="pointer" color={linkColor}>
                {pathName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
    </Breadcrumb>
  );
};
