import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

interface BreadcrumbNavProps {
  path: string;
  onBreadcrumbClick: (newPath: string) => void;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  path,
  onBreadcrumbClick,
}) => {
  return (
    <Breadcrumb
      mb={4}
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      fontSize={{ base: "sm", md: "md" }}
    >
      <BreadcrumbItem onClick={() => onBreadcrumbClick("")}>
        <BreadcrumbLink
          cursor="pointer"
          color="teal.500"
          _hover={{ textDecoration: "underline" }}
        >
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
              <BreadcrumbLink
                cursor="pointer"
                color="teal.500"
                _hover={{ textDecoration: "underline" }}
              >
                {pathName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
    </Breadcrumb>
  );
};
