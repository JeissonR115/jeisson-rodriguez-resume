export { default } from './SmartToc';
export type { Heading } from './useTableOfContents';

export type TocProps = Readonly<{
    container?: string;
    levels?: readonly number[];
    collapsible?: boolean;
}>;
