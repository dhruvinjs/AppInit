export type AnimatedIconType = "express" | "websocket" | "database" | "devops";

export type TemplateCardData = {
  name: string;
  type: AnimatedIconType;
  color: string;
  description: string;
  tags: string[];
};

export type FlagGroup = {
  title: string;
  items: Array<{
    command: string;
    description: string;
  }>;
};

export type TemplatePreview = {
  id: string;
  label: string;
  filePath: string;
  language: string;
  code: string;
};

export type TemplatePreviewSource = Omit<TemplatePreview, "code">;
