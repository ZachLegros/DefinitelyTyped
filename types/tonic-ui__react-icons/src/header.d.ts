import { ReactElement, ReactNode } from "react";
import { TonicProps } from 'tonic-ui__react';

export {}
export function SVGIcon(props: SVGIconProps): ReactElement;
export interface SVGIconProps extends TonicProps {
  size?: TonicProps['width'] | TonicProps['height'];
  viewBox?: string;
}
export function createSVGIcon(svgIcon: ReactNode, options: string | { displayName: string }): (props: SVGIconProps) => ReactElement;